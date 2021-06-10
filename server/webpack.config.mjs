import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import webpack from "webpack";
import NodemonPlugin from "nodemon-webpack-plugin";
import nodeExternals from "webpack-node-externals";

const output = "../dist";

export default {
	entry: "./server/index.ts",
	experiments: {
		topLevelAwait: true
	},
	devtool: "eval-source-map",
	mode: process.env.NODE_ENV || "development",
	module: {
		rules: [
			{
				test: /\.?tsx?$/,
				exclude: /node_modules/,
				use: [{ loader: "ts-loader", options: { onlyCompileBundledFiles: true } }]
			}
		]
	},
	output: { filename: "server.js", path: path.join(__dirname, output), publicPath: "" },
	plugins: [
		new NodemonPlugin({
			watch: path.resolve("./dist/server.js")
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
		})
	],
	resolve: {
		extensions: ["", ".ts", ".tsx", ".js", ".jsx"]
	},
	stats: "errors-only",
	target: "node",
	externalsPresets: { node: true },
	externals: [nodeExternals()]
};
