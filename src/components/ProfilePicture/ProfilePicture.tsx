import "./ProfilePicture.css";
import { FaCircleUser } from "react-icons/fa6";
import { SymbolButton } from '../SymbolButton/SymbolButton';
import React from "react";

export interface ProfilePictureProps {
    pictureUrl?: string;
    editPicture?: () => void;
}

export const ProfilePicture: React.FC<ProfilePictureProps> = ({ pictureUrl, editPicture }) => {
    return (
        <div className="profile-picture-container">
            {pictureUrl ? (
                <img src={pictureUrl} alt="Profile" className="profile-picture" />
            ) : (
                <FaCircleUser className="profile-picture icon" />
            )}
            <div className="edit-button">
                <SymbolButton variant="edit" clickFunc={editPicture}/>
            </div>
        </div>
    );
};
