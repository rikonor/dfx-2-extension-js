NAME        = main
TARGET_DIR ?= out

all: component output-path

init:
	@echo "--> Initializing dependencies"
	@npm install \
		@bytecodealliance/jco \
		@bytecodealliance/componentize-js

target-dir:
	@mkdir -p $(TARGET_DIR)

component: init target-dir
	@echo "--> Componentizing"
	@npx jco componentize \
		src/$(NAME).js \
			--disable all \
			--wit wit/world.wit \
			-o $(TARGET_DIR)/$(NAME).component.wasm

output-path:
	@realpath $(TARGET_DIR)/$(NAME).component.wasm
