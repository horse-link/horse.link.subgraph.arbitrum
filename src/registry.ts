import { log } from "@graphprotocol/graph-ts";
import {
  MarketAdded,
  MarketRemoved,
  VaultAdded,
  VaultRemoved,
  ThresholdUpdated
} from "../generated/Registry/Registry";
import { decrementMarkets, decrementVaults, incrementMarkets, incrementVaults } from "./utils/aggregator";
import { addMarketToRegistry, addVaultToRegistry, removeMarketFromRegistry, removeVaultFromRegistry } from "./utils/registry";

export function handleMarketAdded(event: MarketAdded): void {
  const address = event.params.market;
  addMarketToRegistry(address, event.block.timestamp);
  log.info(`Market registered ${address.toHexString()}`, []);

  // increment markets in aggregator
  incrementMarkets(event.block.timestamp);
}

export function handleMarketRemoved(event: MarketRemoved): void {
  const address = event.params.market;
  removeMarketFromRegistry(address, event.block.timestamp);
  log.info(`Market removed ${address.toHexString()}`, []);

  // decrement markets in aggregator
  decrementMarkets(event.block.timestamp);
}

export function handleVaultAdded(event: VaultAdded): void {
  const address = event.params.vault;
  addVaultToRegistry(address, event.block.timestamp);
  log.info(`Vault registered ${address.toHexString()}`, []);

  // increment vaults in aggregator
  incrementVaults(event.block.timestamp);
}

export function handleVaultRemoved(event: VaultRemoved): void {
  const address = event.params.vault;
  removeVaultFromRegistry(address, event.block.timestamp);
  log.info(`Vault removed ${address.toHexString()}`, []);

  // decrement vaults in aggregator
  decrementVaults(event.block.timestamp);
}

export function handleThresholdUpdated(event: ThresholdUpdated): void {}