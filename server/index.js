import dotenv from "dotenv";

dotenv.config({
  path: `.env${process.env.NODE_ENV ? `-${process.env.NODE_ENV}` : ""}`,
});

(async () => {
  const app = (await import("./app.js")).app;
  const port = process.env.PORT;

  app.listen(port, () =>
    console.log("API is running on http://localhost:" + port + "/api ")
  );
})();
