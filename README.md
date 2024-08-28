Data generator git Repo: https://github.com/hansiWee/dataGenerator
## Nginx Configuration

To use the provided Nginx configuration, follow these steps:

1. Copy the `config/nginx.conf` file to your Nginx configuration directory, typically `/etc/nginx/sites-available/`.
2. Create a symbolic link to the configuration file in the `sites-enabled` directory:
   ```sh
   sudo ln -s /etc/ngin