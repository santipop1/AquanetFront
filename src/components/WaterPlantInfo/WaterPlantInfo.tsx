import { WaterPlant } from "@/types/WaterPlant";

interface WaterPlantInfoProps {
  waterPlant: WaterPlant;
}

const WaterPlantInfo = ({ waterPlant }: WaterPlantInfoProps) => {

    const waterPlantType = waterPlant.plantType ? waterPlant.plantType.name : "";
    const company = waterPlant.plantType ? waterPlant.plantType.company.firstName : "";
    const neighborhood = waterPlant.neighborhood ? waterPlant.neighborhood.name : "";

    return (
        <div className="" style={{ marginBottom: 8, fontSize: 14 }}>
        <div><b>Tipo de purificadora:</b> {waterPlantType}</div>
        <div><b>Compañía:</b> {company}</div>
        <div><b>Colonia:</b> {neighborhood}</div>
        </div>
    );
};

export default WaterPlantInfo;