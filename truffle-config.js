module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Host untuk Ganache
      port: 7545,            // Port default Ganache
      network_id: "*",       // Gunakan ID jaringan apapun
    },
  },
  compilers: {
    solc: {
      version: "0.8.21",  // Versi Solidity yang sesuai
    },
  },
};

