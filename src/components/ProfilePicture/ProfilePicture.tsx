import "./ProfilePicture.css";
import { FaCircleUser } from "react-icons/fa6";
import { SymbolButton } from '../SymbolButton/SymbolButton';
import React from "react";

export interface ProfilePictureProps {
    picture?: string;
}

export const ProfilePicture: React.FC<ProfilePictureProps> = ({ picture }) => {
    return (
        <div className="profile-picture-container">
            {picture ? (
                <img src={picture} alt="Profile" className="profile-picture" />
            ) : (
                <FaCircleUser className="profile-picture icon" />
            )}
            <div className="edit-button">
                <SymbolButton variant="edit"/>
            </div>
        </div>
    );
};
