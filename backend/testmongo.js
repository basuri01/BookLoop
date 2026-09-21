import dns from "node:dns";

dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
]);

dns.resolveSrv(
    "_mongodb._tcp.cluster0.mkjkyhf.mongodb.net",
    (error, addresses) => {

        if (error) {
            console.log("DNS ERROR:", error);
            return;
        }

        console.log("SUCCESS!");
        console.log(addresses);
    }
);