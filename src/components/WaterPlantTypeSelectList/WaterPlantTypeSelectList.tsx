import React from "react";
import WaterPlantTypeSelectCard from "../WaterPlantTypeSelectCard/WaterPlantTypeSelectCard";
import { WaterPlantTypeDTO } from "@/services/waterPlantTypes";

interface Props {
  waterPlantTypes: WaterPlantTypeDTO[];
  recommendedId: number;
  clickFunc1: (waterPlantTypeId: number) => void;
}

const WaterPlantTypeSelectList: React.FC<Props> = ({ waterPlantTypes, recommendedId, clickFunc1 }) => {
  const sortedTypes = [...waterPlantTypes].sort((a, b) => {
    if (a.id === recommendedId) return -1;
    if (b.id === recommendedId) return 1;
    return 0;
  });

  return (
    <div className="flex overflow-x-auto gap-4 px-4 py-2 scroll-smooth h-full flex items-end scrollbar-hidden">
      {sortedTypes.map((waterPlantType) => (
        <div key={waterPlantType.id} className="snap-start shrink-0 w-[50vh]">
          <WaterPlantTypeSelectCard
            waterPlantType={waterPlantType}
            isRecommended={waterPlantType.id === recommendedId}
            clickFunc={() => clickFunc1(waterPlantType.id)}
          />
        </div>
      ))}
    </div>
  );

};

export default WaterPlantTypeSelectList;
