// Calculate rate from source to target using: rate(source→target) = rate(base→target) / rate(base→source)
export function calculateRates(
    rateBaseToSource: number,
    rateBaseToTarget: number,
) {
    const exchangeRate = rateBaseToTarget / rateBaseToSource;
    const inverseRate = 1 / exchangeRate;

    return { exchangeRate, inverseRate };
}
