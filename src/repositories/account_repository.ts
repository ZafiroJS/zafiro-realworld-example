import * as express from "express";
import { injectable, inject } from "inversify";
import { Repository } from "typeorm";
import { interfaces as expressInterfaces } from "inversify-express-utils";
import { TYPE } from "../constants/types";
import * as interfaces from "../interfaces";
import {
    isAuthenticated,
    principalFactory,
    AccountRepository,
    ZAFIRO_TYPE,
    Logger
} from "zafiro";
const GoogleAuth  = require("google-auth-library");

interface GoogleUser {
    givenName: string;
    familyName: string;
    email: string;
    profilePicUrl: string;
}

@injectable()
export default class CustomAccountRepository implements AccountRepository {

    @inject(TYPE.UserRepository) private readonly _userRepository: Repository<interfaces.User>;
    @inject(TYPE.UserRepository) private readonly _roleRepository: Repository<interfaces.Role>;
    @inject(TYPE.UserRoleRepository) private readonly _userRoleRepository: Repository<interfaces.UserRole>;
    @inject(TYPE.PostRepository) private readonly _postRepository: Repository<interfaces.Post>;
    @inject(TYPE.CommentRepository) private readonly _commentRepository: Repository<interfaces.Comment>;
    @inject(ZAFIRO_TYPE.Logger) private readonly _logger: Logger;

    public async isAuthenticated(userDetails: any): Promise<boolean> {
        if (userDetails !== null && userDetails !== undefined) {
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    }

    public async isResourceOwner(userDetails: any, resourceId: any): Promise<boolean> {
        switch (resourceId.type) {
            case "post":
            return await this._isPostOwner(userDetails, resourceId.id);
            case "comment":
                return await this._isComentOwner(userDetails, resourceId.id);
            default:
                throw new Error("Unknown Resource Type!");
        }
    }

    public async isInRole(userDetails: interfaces.User, roleName: string): Promise<boolean> {
        if (isAuthenticated(userDetails)) {
            const role = await this._roleRepository.findOne({
                name: roleName
            });
            if (role !== undefined) {
                const user = await this._userRepository.findOne({ id: userDetails.id });
                if (user !== undefined) {
                    const userRole = this._userRoleRepository.findOne({
                        user: user,
                        role: role
                    });
                    if (userRole !== undefined) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    public async getPrincipal(token: string): Promise<expressInterfaces.Principal> {
        try {
            const googleUser = await this._verifyIdToken(token);
            const userOrUndefined = await this._userRepository.find({
                email: googleUser.email
            });
            this._logger.info("AuthProvider =>", userOrUndefined);
            return principalFactory(userOrUndefined);
        } catch (e) {
            this._logger.error(e.message, e);
            return principalFactory();
        }
    }

    private _verifyIdToken(token: string): Promise<GoogleUser> {

        const auth = new GoogleAuth();
        const googleClientId = process.env.GOOGLE_CLIENT_ID as string;
        const googleAuthApiClient = new auth.OAuth2(googleClientId, "", "");

        return new Promise<GoogleUser>((resolve, reject) => {
            googleAuthApiClient.verifyIdToken(
                token,
                googleClientId,
                (error: any, login: any) => {
                    if (error) {
                        reject(error);
                    }
                    const payload = login.getPayload();
                    const user: GoogleUser = {
                        givenName: payload.given_name,
                        familyName: payload.family_name,
                        email: payload.email,
                        profilePicUrl: payload.picture
                    };
                    resolve(user);
                }
            );
        });
    }

    private async _isPostOwner(userDetails: interfaces.User, postId: number): Promise<boolean> {
        if (isAuthenticated(userDetails)) {
            const user = await this._userRepository.findOne({
                id: userDetails.id
            });
            if (user !== undefined) {
                const postOrUndefined = await this._postRepository.findOne({
                    user: user,
                    id: postId
                });
                if (postOrUndefined !== undefined) {
                    return true;
                }
            }
        }
        return false;
    }

    private async _isComentOwner(userDetails: interfaces.User, commentId: number): Promise<boolean> {
        if (isAuthenticated(userDetails)) {
            const user = await this._userRepository.findOne({
                id: userDetails.id
            });
            if (user !== undefined) {
                const commentOrUndefined = await this._commentRepository.findOne({
                    user: user,
                    id: commentId
                });
                if (commentOrUndefined !== undefined) {
                    return true;
                }
            }
        }
        return false;
    }

}
