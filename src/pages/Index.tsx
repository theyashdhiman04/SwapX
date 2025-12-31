import SwapNavbar from "@/components/SwapNavbar";
import SwapInterface from "@/components/SwapInterface";
import StatsSection from "@/components/StatsSection";
import DEXIntegrations from "@/components/DEXIntegrations";
import SupportedNetworks from "@/components/SupportedNetworks";
import HowItWorks from "@/components/HowItWorks";
import SwapFooter from "@/components/SwapFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SwapNavbar />
      <SwapInterface />
      <StatsSection />
      <DEXIntegrations />
      <HowItWorks />
      <SupportedNetworks />
      <SwapFooter />
    </div>
  );
};

export default Index;
