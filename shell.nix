let
  pkgs = import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/nixos-unstable.tar.gz") {};
  # podflake = (builtins.getFlake (toString ./.))..${builtins.currentSystem};
in
  pkgs.mkShell {
    packages = with pkgs; [
      deno
      python311
      python311Packages.flask
      python311Packages.python-lsp-server
      python311Packages.jedi-language-server
      # podflake
    ];
  }
