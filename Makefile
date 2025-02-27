NAME        = $(shell jq -r .name package.json)
TARGET_DIR ?= out

all: component output-path

init:
	@echo "--> Initializing dependencies"
	@npm install \
		@bytecodealliance/jco \
		@bytecodealliance/componentize-js \
		@bytecodealliance/preview2-shim

target-dir:
	@mkdir -p $(TARGET_DIR)

component: init target-dir
	@echo "--> Componentizing"
	@npx jco componentize \
		src/main.js \
			--disable all \
			--wit wit/world.wit \
			--aot \
			-o $(TARGET_DIR)/$(NAME).component.wasm

output-path:
	@realpath $(TARGET_DIR)/$(NAME).component.wasm
