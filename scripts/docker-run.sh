docker run -it \
	-p 8100:8100 \
	-p 35729:35729 \
	-p 53703:53703 \
	-v $(pwd)/src:/opt/app/src \
	-v $(pwd)/webpack:/opt/app/webpack \
	-v $(pwd)/tslint.json:/opt/app/tslint.json \
	-v $(pwd)/tsconfig.json:/opt/app/tsconfig.json \
	-v $(pwd)/package.json:/opt/app/package.json \
	-v $(pwd)/app.config.js:/opt/app/app.config.js \
	-v $(pwd)/ionic.config.json:/opt/app/ionic.config.json \
	unboxedtechnology/new-years-resolutions