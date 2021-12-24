# target_angle-rock_band
1. install npm package(node_modules) to local folder according to package.json dependencies
2. create schema 'target_angle' at the workbench & fill application.yaml according to your personal data(email service login & password, MySQL DB password)
3. run initial_data.sql script in 'src/main/recources' folder
4. start backend part in 'backend' folder on 8080 port
5. start frontend part in 'frontend' folder using 'npm start' on 3000 port
6. For testing payments use: NUMBER: 4242424242424242,
                            BRAND: Visa,
                            CVC: Any 3 digits,
                            DATE: Any future date.
