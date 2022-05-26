import { library } from '@fortawesome/fontawesome-svg-core';

import { faToggleOn } from '@fortawesome/free-solid-svg-icons';

export class FontAwesomeLoader {
  load() {
    return library.add(faToggleOn);
  }
}