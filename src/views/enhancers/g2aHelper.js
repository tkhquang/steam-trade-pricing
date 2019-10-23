import UUID from "uuid/v4";
import { stripPattern } from "constants/g2a";

class G2aHelperService {
  constructor() {
    this.strip = string => {
      return string.toLowerCase().replace(stripPattern, "");
    };
  }

  genGameItem(id, title) {
    return {
      id,
      title,
      search: this.strip(title),
      open: false
    };
  }

  // Generate Game List Object
  genGameListObj(titles) {
    let obj = {};
    titles.forEach(title => {
      const id = UUID();
      obj = { ...obj, [id]: this.genGameItem(id, title) };
    });
    return obj;
  }
}

export default new G2aHelperService();
