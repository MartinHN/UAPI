set -e

pushd "genJSONSchema/test"
ts-node index.ts
popd #"genJSONSchema/test"

pushd "cppGen"
ts-node index.ts

# pushd "examples/websocketComms/cpp/build"

# # export EMSDK_QUIET=1
# # source "/Users/tinmarbook/Dev/emsdk/emsdk_env.sh"
# # emsdk activate tot

# CMAKE_DEFS="-DCMAKE_TOOLCHAIN_FILE=/Users/tinmarbook/Dev/emsdk/upstream/emscripten/cmake/Modules/Platform/Emscripten.cmake -DCMAKE_BUILD_TYPE=Release "

# cmake .. ${CMAKE_DEFS}
# make -j4

# # ./test
# # ls -ldh test
# # ls -ldh /tmp/lala.bin
# popd #"test/cpp/build"

pushd examples/websocketComms/websock/build
cmake .. && make -j4
./websowk
popd
popd # "cppGen"s
