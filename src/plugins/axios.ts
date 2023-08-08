import axios from 'axios';

const instance = (() => {
  let _instance: any = null;
  const replaceLocalhost = (something: any) => {
    return JSON.parse(
      JSON.stringify(something).replace(
        /http:\/\/localhost/g,
        import.meta.env.VITE_DEV_BACKED_URL,
      ),
    );
  };
  return {
    set() {
      let domain;
      if (import.meta.env.PROD) {
        domain = import.meta.env.VITE_BACKED_URL;
      } else {
        domain = `${import.meta.env.VITE_DEV_BACKED_URL}:${
          import.meta.env.VITE_DEV_BACKED_PORT
        }`;
      }
      _instance = axios.create({
        baseURL: domain,
      });
      _instance.interceptors.response.use(
        function (response: any) {
          if (import.meta.env.PROD) {
            return response;
          }
          return replaceLocalhost(response);
        },
        function (error: any) {
          return Promise.reject(error);
        },
      );
    },
    get() {
      if (!_instance) {
        this.set();
      }
      return _instance;
    },
  };
})();
export default instance.get();
