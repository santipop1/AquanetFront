import * as React from "react";
import "./ContratarPlan.css";
import { ButtonText } from "../ButtonText/ButtonText";

interface ContratarPlanProps {
  variant?: "default" | "subscribed";
  planType: "monthly" | "anual" | null | string;
  size?: "default" | "small";
}

const ContratarPlan: React.FC<ContratarPlanProps> = ({
  variant = "default",
  planType,
  size = "default"
}) => {

  const titulo = planType === "monthly" ? "Plan Mensual" : "Plan Anual";
  const precio = planType === "monthly" ? "$699" : "$579";
  const notaAdicional = planType === "monthly" ? "" : "un sólo pago de $6948";

  if(size === "small") {
    return (
      <div className=" flex rounded-3xl bg-[rgb(0,0,51)] hover:-translate-y-1 min-h-60 max-h-60 min-w-80 max-w-80 items-center justify-between">
        <div className="h-full w-full flex flex-col items-center justify-center text-center">
          <p className="text-white text-3xl pb-2">{titulo}</p>
          <p className="text-white text-2xl">{precio}</p>
          <p className="text-[#00b84c] text-2xl">al mes</p>
          <p className="text-white text-xl">{notaAdicional}</p>
          <div className="pt-3">
            <ButtonText variant="variant4" label="Contratar" size="lg"/>
          </div>
        </div>
      </div>
    );
  }

  if(variant === "subscribed") {
    return (
      <div className=" flex rounded-3xl bg-[rgb(0,0,51)] hover:-translate-y-1 min-h-80 max-h-80 min-w-80 max-w-80 items-center justify-between">
        <div className="h-full w-full flex flex-col items-center justify-center text-center">
          <p className="text-white text-3xl pb-2">{titulo}</p>
          <p className="text-white text-2xl">{precio}</p>
          <p className="text-[#00b84c] text-2xl">al mes</p>
          <p className="text-white text-xl">{notaAdicional}</p>
          <div className="pt-5">
            <ButtonText variant="variant6" label="Cambiar de método de pago" size="md" minW={65}/>
          </div>
          <div className="pt-3">
            <ButtonText variant="variant4" label="Cancelar suscripción" size="md" minW={65}/>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" flex rounded-3xl bg-[rgb(0,0,51)] hover:-translate-y-1 min-h-80 max-h-80 min-w-80 max-w-80 items-center justify-between">
      <div className="h-full w-full flex flex-col items-center justify-center text-center">
        <p className="text-white text-3xl pb-2">{titulo}</p>
        <p className="text-white text-2xl">{precio}</p>
        <p className="text-[#00b84c] text-2xl">al mes</p>
        <p className="text-white text-xl">{notaAdicional}</p>
        <div className="pt-3">
          <ButtonText variant="variant4" label="Contratar" size="lg"/>
        </div>
      </div>
    </div>
  );
};

export default ContratarPlan;