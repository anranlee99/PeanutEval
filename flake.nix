{
  description = "Simple flake for building runpodctl";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    # runpod.url = "github:runpod/runpodctl";
    # runpod.flake = false;
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = import nixpkgs {inherit system;};
    in {
      packages.default = pkgs.buildGoModule {
        name = "runpodctl";
        pname = "runpodctl";
        verison = "1.0.0-test";
        src = pkgs.fetchFromGitHub {
          owner = "runpod";
          repo = "runpodctl";
          rev = "ad5f1f76bdb083d6959d0f4dec0595370f87ef0b";
          hash = "sha256-ot/xxCL0RnMG39KDqINdAj6BSX+OLY6CusmP9Ubn8QI=";
        };
        vendorHash = "sha256-OGUt+L0wP6eQkY/HWL+Ij9z9u+wsQ5OLK/IAq+1ezVA=";
      };
    });
}
