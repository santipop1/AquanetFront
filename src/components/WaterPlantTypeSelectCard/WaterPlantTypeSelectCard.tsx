import React from "react";
import { WaterPlantTypeDTO } from "@/services/waterPlantTypes";
import Image from "next/image";

interface Props {
  waterPlantType: WaterPlantTypeDTO;
  isRecommended?: boolean;
  clickFunc: () => void;
}

const WaterPlantTypeSelectCard: React.FC<Props> = ({ waterPlantType, isRecommended, clickFunc }) => {

    if(isRecommended) {
        return(
            <div className="items-center flex flex-col justify-center rounded-3xl h-140 shadow-sm group border-2 border-[#166534] hover:-translate-y-1 bg-[#166534] text-black font-sans mb-5 mx-2.5 min-h-160">
                <p className="text-white font-bold text-2xl py-5">Recomendada</p>
                <div 
                    className="items-center flex flex-col justify-center rounded-3xl h-140 shadow-sm group border-2 border-[#166534] bg-gray-100 text-black font-sans mb-5 mx-2.5 min-h-140"
                    onClick={clickFunc}
                >
                    <Image 
                    src={waterPlantType.userProfilePictureUrl}
                    width="240"
                    height="100"
                    
                    alt={waterPlantType.userFirstName}
                    className="object-cover pt-6 px-6"
                    />
                    <p className="pt-3 pb-1.5 group-hover:text-[#568B89] font-bold text-2xl text-center w-[90%]">{waterPlantType.name}</p>
                    <p className="pt-3 pb-1.5 text-xl text-center w-[90%] italic font-semibold">{waterPlantType.userFirstName}</p>
                    <p className="pt-3 pb-1.5 text-md text-center w-[90%]">{waterPlantType.description}</p>
                    <div className="flex gap-6">
                        <p className="pb-4"><strong>Precio: </strong>${waterPlantType.price.toLocaleString()}</p>
                        <p className="pb-4"><strong>Tamaño: </strong>{waterPlantType.sizeM2} m²</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div 
            className="items-center flex flex-col justify-center rounded-3xl shadow-sm group border-2 border-[#166534] hover:-translate-y-1 bg-gray-100 text-black font-sans mb-5 mx-2.5 min-h-140"
            onClick={clickFunc}
        >
            <Image 
              src={waterPlantType.userProfilePictureUrl}
              width="240"
              height="100"
            
              alt={waterPlantType.userFirstName}
              className="object-cover pt-6 px-6"
            />
            <p className="pt-3 pb-1.5 group-hover:text-[#568B89] font-bold text-2xl text-center w-[90%]">{waterPlantType.name}</p>
            <p className="pt-3 pb-1.5 text-xl text-center w-[90%] italic font-semibold">{waterPlantType.userFirstName}</p>
            <p className="pt-3 pb-1.5 text-md text-center w-[90%]">{waterPlantType.description}</p>
            <div className="flex gap-6">
                <p className="pb-4"><strong>Precio: </strong>${waterPlantType.price.toLocaleString()}</p>
                <p className="pb-4"><strong>Tamaño: </strong>{waterPlantType.sizeM2} m²</p>
            </div>
        </div>
    );
};

export default WaterPlantTypeSelectCard;