// import adapter from '@sveltejs/adapter-auto';

// /** @type {import('@sveltejs/kit').Config} */
// const config = {
// 	kit: {
// 		adapter: adapter()
// 	}
// };

// export default config;

import adapter from '@sveltejs/adapter-netlify';

export default {
  kit: {
    // default options are shown
    adapter: adapter({
		edge: true
	})
  }
};
