export class SteamHelperService {
  constructor() {
    this.getPrice = (prices, id) => {
      return prices[id].median_price;
    };
  }

  gemPrice(prices) {
    return this.getPrice(prices, "sog");
  }

  csgoKeyPrice(prices) {
    return this.getPrice(prices, "csgo-key");
  }

  tf2KeyPrice(prices) {
    return this.getPrice(prices, "tf2-key");
  }

  getPrices(prices) {
    return {
      gems: this.gemPrice(prices),
      csgoKey: this.csgoKeyPrice(prices),
      tf2Key: this.tf2KeyPrice(prices)
    };
  }
}

export default new SteamHelperService();
