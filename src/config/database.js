import "dotenv/config";

export default process.env.DATABASE_URL
  ? {
      url: process.env.DATABASE_URL,
      dialect: "postgres",
      define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true
      }
    }
  : {
      dialect: "postgres",
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true
      }
    };