docker run -it \
	-p 8100:8100 \
	-p 35729:35729 \
	-p 53703:53703 \
	- $(pwd)/src:/opt/app/src \
	- $(pwd)/webpack:/opt/app/webpack \
	- $(pwd)/tslint.json:/opt/app/tslint.json \
	- $(pwd)/tsconfig.json:/opt/app/tsconfig.json \
	- $(pwd)/package.json:/opt/app/package.json \
	- $(pwd)/app.config.js:/opt/app/app.config.js \
	- $(pwd)/ionic.config.json:/opt/app/ionic.config.json \
	unboxedtechnology/new-years-resolutions