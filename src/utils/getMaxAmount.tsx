import { InterestRate, ReserveDataHumanized } from "@aave/contract-helpers";
import {
  FormatReserveUSDResponse,
  FormatUserSummaryAndIncentivesResponse,
} from "@aave/math-utils";
import { getMaxAmountAvailableToSupply } from "./getMaxAmountAvailableToSupply";
import {
  CHAIN_DEFAULT,
  minBaseTokenRemainingByNetwork,
} from "../constants/chains";
import { getMaxAmountAvailableToWithdraw } from "./getMaxAmountAvailableToWithdraw";
import { getMaxAmountAvailableToBorrow } from "./getMaxAmountAvailableToBorrow";

export const getMaxAmount = (
  type: string,
  reserve: ReserveDataHumanized &
    FormatReserveUSDResponse & {
      borrowBalance: number;
      borrowBalanceUsd: number;
      supplyBalance: number;
      supplyBalanceUsd: number;
      walletBalance: number;
      logo: string;
      priceInUSD: string;
    },
  userSummary: FormatUserSummaryAndIncentivesResponse<
    ReserveDataHumanized & FormatReserveUSDResponse
  >,
  chainId: number
) => {
  let maxAmount = -1;
  switch (true) {
    case type === "deposit": {
      const {
        supplyCap,
        isFrozen,
        decimals,
        debtCeiling,
        isolationModeTotalDebt,
        totalLiquidity,
        underlyingAsset,
      } = reserve;
      const minBaseTokenRemaining =
        minBaseTokenRemainingByNetwork[chainId || CHAIN_DEFAULT.id] || "0.001";
      maxAmount = +getMaxAmountAvailableToSupply(
        `${Number(reserve?.walletBalance)}`,
        {
          supplyCap,
          totalLiquidity,
          isFrozen,
          decimals,
          debtCeiling,
          isolationModeTotalDebt,
        },
        underlyingAsset,
        minBaseTokenRemaining
      );
      break;
    }
    case type === "withdraw": {
      maxAmount = +getMaxAmountAvailableToWithdraw(
        {
          underlyingBalance: reserve?.supplyBalance.toString(),
          usageAsCollateralEnabledOnUser: true,
        },
        {
          eModeCategoryId: 0,
          formattedEModeLiquidationThreshold:
            reserve?.formattedEModeLiquidationThreshold,
          formattedPriceInMarketReferenceCurrency:
            reserve?.formattedPriceInMarketReferenceCurrency,
          formattedReserveLiquidationThreshold:
            reserve?.formattedReserveLiquidationThreshold,
          reserveLiquidationThreshold: reserve?.reserveLiquidationThreshold,
          unborrowedLiquidity: reserve.unborrowedLiquidity,
        },
        {
          healthFactor: userSummary.healthFactor,
          isInEmode: false,
          userEmodeCategoryId: 0,
          totalBorrowsMarketReferenceCurrency:
            userSummary.totalBorrowsMarketReferenceCurrency,
        }
      );
      break;
    }
    case type === "borrow": {
      maxAmount = +getMaxAmountAvailableToBorrow(
        reserve,
        userSummary,
        InterestRate.Variable
      );
      break;
    }
    case type === "repay": {
      maxAmount = Number(reserve?.borrowBalance);
      break;
    }
    default:
      break;
  }
  return maxAmount;
};
