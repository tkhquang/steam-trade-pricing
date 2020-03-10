import { defaultSettings } from "@constants";
import { helpers } from "@utils";

class G2aHelperService {
  constructor() {
    this.strip = string => {
      return string.toLowerCase().replace(defaultSettings.stripPattern, "");
    };
  }

  genGameItem(title) {
    return {
      title,
      search: this.strip(title),
      open: false,
      meta: {
        data: {},
        status: {
          loading: true,
          error: null
        }
      },
      auctions: {},
      details: {
        data: {},
        status: {
          loading: true,
          error: null
        }
      }
    };
  }

  // Generate Game List Object
  genGameListObj(titles) {
    return helpers.toObj(titles.map(title => this.genGameItem(title)));
  }
}

export default new G2aHelperService();
