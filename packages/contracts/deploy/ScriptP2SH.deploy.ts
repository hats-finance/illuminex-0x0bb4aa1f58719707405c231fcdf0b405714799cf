import "hardhat-deploy";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  await deploy("ScriptP2SH", {
    from: deployer,
    log: true,
    args: [],
  });
};

func.tags = ["ScriptP2SH"];
func.dependencies = [];

export default func;