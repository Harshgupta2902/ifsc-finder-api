# IFSC Code Processing and API Setup

## Overview
This project processes and transforms IFSC code data from Razorpay's GitHub repository, inserts it into MongoDB Atlas, and sets up an API to access the data.

## Steps to Follow

### 1️⃣ Get `bybank` JSON from Razorpay
Retrieve the latest `bybank` JSON file from the [Razorpay GitHub Repo](https://github.com/razorpay/ifsc) and store it in the `by-bank/` directory.

### 2️⃣ Merge JSON Files
Create a `merge.js` script to combine the JSON files. Run the script using:

```sh
npm run dev
```

This will generate a `merged.json` file, though it may not be in the desired format.

### 3️⃣ Transform to Desired Format
Create a `transform.js` script to convert `merged.json` into the required `ifsc-code.json` format.
Run the transformation script:

```sh
node transform.js
```

### 4️⃣ Insert Data into MongoDB Atlas
Use `ifsc_insert` to connect to MongoDB Atlas and insert the transformed JSON into the database:

```sh
node ifsc_insert.js
```

### 5️⃣ Run the API Server
Once the database is populated, start the API server:

```sh
npm run dev
```

Your API is now live and ready to serve IFSC-related queries! 🚀

## Contributions & Support
Feel free to contribute or raise an issue if you encounter any problems. Happy coding! 😃
