CREATE TABLE `address_info` (
                                `id` int NOT NULL AUTO_INCREMENT,
                                `country` varchar(255) DEFAULT NULL,
                                `first_line` varchar(255) DEFAULT NULL,
                                `second_line` varchar(255) DEFAULT NULL,
                                `state` varchar(255) DEFAULT NULL,
                                `zip_code` varchar(255) DEFAULT NULL,
                                PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `apparel_category` (
                                    `id` int NOT NULL AUTO_INCREMENT,
                                    `type` varchar(255) DEFAULT NULL,
                                    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `carousel_images` (
                                   `id` int NOT NULL AUTO_INCREMENT,
                                   `image_local_path` varchar(255) DEFAULT NULL,
                                   `imageurl` varchar(255) DEFAULT NULL,
                                   `link` varchar(255) DEFAULT NULL,
                                   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


CREATE TABLE `chat_message` (
                                `id` bigint NOT NULL AUTO_INCREMENT,
                                `content` varchar(255) DEFAULT NULL,
                                `date` datetime DEFAULT NULL,
                                `sender` varchar(255) DEFAULT NULL,
                                `sender_img` varchar(255) DEFAULT NULL,
                                `type` int DEFAULT NULL,
                                PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `contact_info` (
                                `id` int NOT NULL AUTO_INCREMENT,
                                `email` varchar(255) DEFAULT NULL,
                                `mobile` varchar(255) DEFAULT NULL,
                                `office` varchar(255) DEFAULT NULL,
                                `other` varchar(255) DEFAULT NULL,
                                PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `gender_category` (
                                   `id` int NOT NULL,
                                   `type` varchar(255) DEFAULT NULL,
                                   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `price_range_category` (
                                        `id` int NOT NULL,
                                        `type` varchar(255) DEFAULT NULL,
                                        PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `product_brand_category` (
                                          `id` int NOT NULL AUTO_INCREMENT,
                                          `type` varchar(255) DEFAULT NULL,
                                          PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `apparel_images` (
                                  `id` int NOT NULL AUTO_INCREMENT,
                                  `image_local_path` varchar(255) DEFAULT NULL,
                                  `imageurl` varchar(255) DEFAULT NULL,
                                  `title` varchar(255) DEFAULT NULL,
                                  `apparel_id` int DEFAULT NULL,
                                  `gender_id` int DEFAULT NULL,
                                  PRIMARY KEY (`id`),
                                  KEY `FKbhhntl1fv5cccoc8kdi9no5nk` (`apparel_id`),
                                  KEY `FKdppl4w7x3149j5vskuxr27fbp` (`gender_id`),
                                  CONSTRAINT `FKbhhntl1fv5cccoc8kdi9no5nk` FOREIGN KEY (`apparel_id`) REFERENCES `apparel_category` (`id`),
                                  CONSTRAINT `FKdppl4w7x3149j5vskuxr27fbp` FOREIGN KEY (`gender_id`) REFERENCES `gender_category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `bank_info` (
                             `id` int NOT NULL AUTO_INCREMENT,
                             `account_number` varchar(255) DEFAULT NULL,
                             `bank_name` varchar(255) DEFAULT NULL,
                             `customer_id` int NOT NULL,
                             `first_name` varchar(255) DEFAULT NULL,
                             `last_name` varchar(255) DEFAULT NULL,
                             `routing_number` varchar(255) DEFAULT NULL,
                             `seller_id` int NOT NULL,
                             `address_id` int DEFAULT NULL,
                             `contact_id` int DEFAULT NULL,
                             PRIMARY KEY (`id`),
                             KEY `FKlt5lxtmmschwmaik8bk7e081d` (`address_id`),
                             KEY `FKegmte3pxp69hx9rys4in03q4a` (`contact_id`),
                             CONSTRAINT `FKegmte3pxp69hx9rys4in03q4a` FOREIGN KEY (`contact_id`) REFERENCES `contact_info` (`id`),
                             CONSTRAINT `FKlt5lxtmmschwmaik8bk7e081d` FOREIGN KEY (`address_id`) REFERENCES `address_info` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `brand_images` (
                                `id` int NOT NULL AUTO_INCREMENT,
                                `image_local_path` varchar(255) DEFAULT NULL,
                                `imageurl` varchar(255) DEFAULT NULL,
                                `title` varchar(255) DEFAULT NULL,
                                `brand_id` int DEFAULT NULL,
                                PRIMARY KEY (`id`),
                                KEY `FK9e5sybnkqq5l0ia5iygep6vtq` (`brand_id`),
                                CONSTRAINT `FK9e5sybnkqq5l0ia5iygep6vtq` FOREIGN KEY (`brand_id`) REFERENCES `product_brand_category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


CREATE TABLE `order_info` (
                              `id` int NOT NULL AUTO_INCREMENT,
                              `customer_id` int NOT NULL,
                              `delivery_status` varchar(255) DEFAULT NULL,
                              `timestamp` varchar(255) DEFAULT NULL,
                              `track_package_link` varchar(255) DEFAULT NULL,
                              `address_id` int DEFAULT NULL,
                              `product_id` int DEFAULT NULL,
                              PRIMARY KEY (`id`),
                              KEY `FKjtn74v05w29os87mepaa06kll` (`address_id`),
                              KEY `FKm54qruhhds5mlklmo9fcf7tcm` (`product_id`),
                              CONSTRAINT `FKjtn74v05w29os87mepaa06kll` FOREIGN KEY (`address_id`) REFERENCES `address_info` (`id`),
                              CONSTRAINT `FKm54qruhhds5mlklmo9fcf7tcm` FOREIGN KEY (`product_id`) REFERENCES `order_info` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `product_info` (
                                `id` int NOT NULL AUTO_INCREMENT,
                                `available_quantity` int NOT NULL,
                                `delivery_time` int NOT NULL,
                                `image_local_path` varchar(255) DEFAULT NULL,
                                `imageurl` varchar(255) DEFAULT NULL,
                                `name` varchar(255) DEFAULT NULL,
                                `price` double NOT NULL,
                                `publication_date` date DEFAULT NULL,
                                `ratings` float NOT NULL,
                                `seller_id` int NOT NULL,
                                `verification_status` bit(1) NOT NULL,
                                `apparel_id` int DEFAULT NULL,
                                `gender_id` int DEFAULT NULL,
                                `price_id` int DEFAULT NULL,
                                `brand_id` int DEFAULT NULL,
                                PRIMARY KEY (`id`),
                                KEY `IDX9ws9cwjer26lrdx8pg18o4npv` (`gender_id`,`apparel_id`,`brand_id`,`price`),
                                KEY `FKaoybeugv1xmsh079m2i89p7ug` (`apparel_id`),
                                KEY `FK5erklkue0hhpawivdg5613nmo` (`price_id`),
                                KEY `FK2fxk6m27hqpy3h82pn6l1hpb9` (`brand_id`),
                                CONSTRAINT `FK2fxk6m27hqpy3h82pn6l1hpb9` FOREIGN KEY (`brand_id`) REFERENCES `product_brand_category` (`id`),
                                CONSTRAINT `FK5erklkue0hhpawivdg5613nmo` FOREIGN KEY (`price_id`) REFERENCES `price_range_category` (`id`),
                                CONSTRAINT `FKaoybeugv1xmsh079m2i89p7ug` FOREIGN KEY (`apparel_id`) REFERENCES `apparel_category` (`id`),
                                CONSTRAINT `FKbuskw9m5b0ji86wihiw38dfmt` FOREIGN KEY (`gender_id`) REFERENCES `gender_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

INSERT INTO target_angle.product_info (id, available_quantity, delivery_time, image_local_path, imageurl, name, price, publication_date, ratings, seller_id, verification_status, apparel_id, gender_id, price_id, brand_id) VALUES (1, 0, 0, null, 'https://firebasestorage.googleapis.com/v0/b/target-angle-rock-band.appspot.com/o/target-angle-stuff%2F%D0%A4%D1%83%D1%82%D0%B1%D0%BE%D0%BB%D0%BA%D0%B0.png?alt=media&token=63e6a2d7-df96-44c5-82b8-f50268e9851c', 'Футболка', 1500, null, 0, 1, false, null, null, null, null);
INSERT INTO target_angle.product_info (id, available_quantity, delivery_time, image_local_path, imageurl, name, price, publication_date, ratings, seller_id, verification_status, apparel_id, gender_id, price_id, brand_id) VALUES (2, 0, 0, null, 'https://firebasestorage.googleapis.com/v0/b/target-angle-rock-band.appspot.com/o/target-angle-stuff%2F%D0%9A%D1%80%D1%83%D0%B6%D0%BA%D0%B0.png?alt=media&token=7a9036d6-0ee5-4b31-ba47-04e4b48a974f', 'Кружка', 500, null, 0, 1, false, null, null, null, null);
INSERT INTO target_angle.product_info (id, available_quantity, delivery_time, image_local_path, imageurl, name, price, publication_date, ratings, seller_id, verification_status, apparel_id, gender_id, price_id, brand_id) VALUES (3, 0, 0, null, 'https://firebasestorage.googleapis.com/v0/b/target-angle-rock-band.appspot.com/o/target-angle-stuff%2F%D0%91%D1%80%D0%B0%D1%81%D0%BB%D0%B5%D1%82.png?alt=media&token=d0727906-f767-4177-948b-95ea2eabf25b', 'Браслет', 1000, null, 0, 1, false, null, null, null, null);
INSERT INTO target_angle.product_info (id, available_quantity, delivery_time, image_local_path, imageurl, name, price, publication_date, ratings, seller_id, verification_status, apparel_id, gender_id, price_id, brand_id) VALUES (4, 0, 0, null, 'https://firebasestorage.googleapis.com/v0/b/target-angle-rock-band.appspot.com/o/target-angle-stuff%2F%D0%91%D0%B8%D1%80%D0%BA%D0%B0.png?alt=media&token=05593dea-3688-49fa-b7e6-39a9792518f0', 'Бирка', 500, null, 0, 1, false, null, null, null, null);

DROP TABLE IF EXISTS QRTZ_FIRED_TRIGGERS;
DROP TABLE IF EXISTS QRTZ_PAUSED_TRIGGER_GRPS;
DROP TABLE IF EXISTS QRTZ_SCHEDULER_STATE;
DROP TABLE IF EXISTS QRTZ_LOCKS;
DROP TABLE IF EXISTS QRTZ_SIMPLE_TRIGGERS;
DROP TABLE IF EXISTS QRTZ_SIMPROP_TRIGGERS;
DROP TABLE IF EXISTS QRTZ_CRON_TRIGGERS;
DROP TABLE IF EXISTS QRTZ_BLOB_TRIGGERS;
DROP TABLE IF EXISTS QRTZ_TRIGGERS;
DROP TABLE IF EXISTS QRTZ_JOB_DETAILS;
DROP TABLE IF EXISTS QRTZ_CALENDARS;

CREATE TABLE QRTZ_JOB_DETAILS(
                                 SCHED_NAME VARCHAR(120) NOT NULL,
                                 JOB_NAME VARCHAR(190) NOT NULL,
                                 JOB_GROUP VARCHAR(190) NOT NULL,
                                 DESCRIPTION VARCHAR(250) NULL,
                                 JOB_CLASS_NAME VARCHAR(250) NOT NULL,
                                 IS_DURABLE VARCHAR(1) NOT NULL,
                                 IS_NONCONCURRENT VARCHAR(1) NOT NULL,
                                 IS_UPDATE_DATA VARCHAR(1) NOT NULL,
                                 REQUESTS_RECOVERY VARCHAR(1) NOT NULL,
                                 JOB_DATA BLOB NULL,
                                 PRIMARY KEY (SCHED_NAME,JOB_NAME,JOB_GROUP))
    ENGINE=InnoDB;

CREATE TABLE QRTZ_TRIGGERS (
                               SCHED_NAME VARCHAR(120) NOT NULL,
                               TRIGGER_NAME VARCHAR(190) NOT NULL,
                               TRIGGER_GROUP VARCHAR(190) NOT NULL,
                               JOB_NAME VARCHAR(190) NOT NULL,
                               JOB_GROUP VARCHAR(190) NOT NULL,
                               DESCRIPTION VARCHAR(250) NULL,
                               NEXT_FIRE_TIME BIGINT(13) NULL,
                               PREV_FIRE_TIME BIGINT(13) NULL,
                               PRIORITY INTEGER NULL,
                               TRIGGER_STATE VARCHAR(16) NOT NULL,
                               TRIGGER_TYPE VARCHAR(8) NOT NULL,
                               START_TIME BIGINT(13) NOT NULL,
                               END_TIME BIGINT(13) NULL,
                               CALENDAR_NAME VARCHAR(190) NULL,
                               MISFIRE_INSTR SMALLINT(2) NULL,
                               JOB_DATA BLOB NULL,
                               PRIMARY KEY (SCHED_NAME,TRIGGER_NAME,TRIGGER_GROUP),
                               FOREIGN KEY (SCHED_NAME,JOB_NAME,JOB_GROUP)
                                   REFERENCES QRTZ_JOB_DETAILS(SCHED_NAME,JOB_NAME,JOB_GROUP))
    ENGINE=InnoDB;

CREATE TABLE QRTZ_SIMPLE_TRIGGERS (
                                      SCHED_NAME VARCHAR(120) NOT NULL,
                                      TRIGGER_NAME VARCHAR(190) NOT NULL,
                                      TRIGGER_GROUP VARCHAR(190) NOT NULL,
                                      REPEAT_COUNT BIGINT(7) NOT NULL,
                                      REPEAT_INTERVAL BIGINT(12) NOT NULL,
                                      TIMES_TRIGGERED BIGINT(10) NOT NULL,
                                      PRIMARY KEY (SCHED_NAME,TRIGGER_NAME,TRIGGER_GROUP),
                                      FOREIGN KEY (SCHED_NAME,TRIGGER_NAME,TRIGGER_GROUP)
                                          REFERENCES QRTZ_TRIGGERS(SCHED_NAME,TRIGGER_NAME,TRIGGER_GROUP))
    ENGINE=InnoDB;

CREATE TABLE QRTZ_CRON_TRIGGERS (
                                    SCHED_NAME VARCHAR(120) NOT NULL,
                                    TRIGGER_NAME VARCHAR(190) NOT NULL,
                                    TRIGGER_GROUP VARCHAR(190) NOT NULL,
                                    CRON_EXPRESSION VARCHAR(120) NOT NULL,
                                    TIME_ZONE_ID VARCHAR(80),
                                    PRIMARY KEY (SCHED_NAME,TRIGGER_NAME,TRIGGER_GROUP),
                                    FOREIGN KEY (SCHED_NAME,TRIGGER_NAME,TRIGGER_GROUP)
                                        REFERENCES QRTZ_TRIGGERS(SCHED_NAME,TRIGGER_NAME,TRIGGER_GROUP))
    ENGINE=InnoDB;

CREATE TABLE QRTZ_SIMPROP_TRIGGERS
(
    SCHED_NAME VARCHAR(120) NOT NULL,
    TRIGGER_NAME VARCHAR(190) NOT NULL,
    TRIGGER_GROUP VARCHAR(190) NOT NULL,
    STR_PROP_1 VARCHAR(512) NULL,
    STR_PROP_2 VARCHAR(512) NULL,
    STR_PROP_3 VARCHAR(512) NULL,
    INT_PROP_1 INT NULL,
    INT_PROP_2 INT NULL,
    LONG_PROP_1 BIGINT NULL,
    LONG_PROP_2 BIGINT NULL,
    DEC_PROP_1 NUMERIC(13,4) NULL,
    DEC_PROP_2 NUMERIC(13,4) NULL,
    BOOL_PROP_1 VARCHAR(1) NULL,
    BOOL_PROP_2 VARCHAR(1) NULL,
    PRIMARY KEY (SCHED_NAME,TRIGGER_NAME,TRIGGER_GROUP),
    FOREIGN KEY (SCHED_NAME,TRIGGER_NAME,TRIGGER_GROUP)
        REFERENCES QRTZ_TRIGGERS(SCHED_NAME,TRIGGER_NAME,TRIGGER_GROUP))
    ENGINE=InnoDB;

CREATE TABLE QRTZ_BLOB_TRIGGERS (
                                    SCHED_NAME VARCHAR(120) NOT NULL,
                                    TRIGGER_NAME VARCHAR(190) NOT NULL,
                                    TRIGGER_GROUP VARCHAR(190) NOT NULL,
                                    BLOB_DATA BLOB NULL,
                                    PRIMARY KEY (SCHED_NAME,TRIGGER_NAME,TRIGGER_GROUP),
                                    INDEX (SCHED_NAME,TRIGGER_NAME, TRIGGER_GROUP),
                                    FOREIGN KEY (SCHED_NAME,TRIGGER_NAME,TRIGGER_GROUP)
                                        REFERENCES QRTZ_TRIGGERS(SCHED_NAME,TRIGGER_NAME,TRIGGER_GROUP))
    ENGINE=InnoDB;

CREATE TABLE QRTZ_CALENDARS (
                                SCHED_NAME VARCHAR(120) NOT NULL,
                                CALENDAR_NAME VARCHAR(190) NOT NULL,
                                CALENDAR BLOB NOT NULL,
                                PRIMARY KEY (SCHED_NAME,CALENDAR_NAME))
    ENGINE=InnoDB;

CREATE TABLE QRTZ_PAUSED_TRIGGER_GRPS (
                                          SCHED_NAME VARCHAR(120) NOT NULL,
                                          TRIGGER_GROUP VARCHAR(190) NOT NULL,
                                          PRIMARY KEY (SCHED_NAME,TRIGGER_GROUP))
    ENGINE=InnoDB;

CREATE TABLE QRTZ_FIRED_TRIGGERS (
                                     SCHED_NAME VARCHAR(120) NOT NULL,
                                     ENTRY_ID VARCHAR(95) NOT NULL,
                                     TRIGGER_NAME VARCHAR(190) NOT NULL,
                                     TRIGGER_GROUP VARCHAR(190) NOT NULL,
                                     INSTANCE_NAME VARCHAR(190) NOT NULL,
                                     FIRED_TIME BIGINT(13) NOT NULL,
                                     SCHED_TIME BIGINT(13) NOT NULL,
                                     PRIORITY INTEGER NOT NULL,
                                     STATE VARCHAR(16) NOT NULL,
                                     JOB_NAME VARCHAR(190) NULL,
                                     JOB_GROUP VARCHAR(190) NULL,
                                     IS_NONCONCURRENT VARCHAR(1) NULL,
                                     REQUESTS_RECOVERY VARCHAR(1) NULL,
                                     PRIMARY KEY (SCHED_NAME,ENTRY_ID))
    ENGINE=InnoDB;

CREATE TABLE QRTZ_SCHEDULER_STATE (
                                      SCHED_NAME VARCHAR(120) NOT NULL,
                                      INSTANCE_NAME VARCHAR(190) NOT NULL,
                                      LAST_CHECKIN_TIME BIGINT(13) NOT NULL,
                                      CHECKIN_INTERVAL BIGINT(13) NOT NULL,
                                      PRIMARY KEY (SCHED_NAME,INSTANCE_NAME))
    ENGINE=InnoDB;

CREATE TABLE QRTZ_LOCKS (
                            SCHED_NAME VARCHAR(120) NOT NULL,
                            LOCK_NAME VARCHAR(40) NOT NULL,
                            PRIMARY KEY (SCHED_NAME,LOCK_NAME))
    ENGINE=InnoDB;

CREATE INDEX IDX_QRTZ_J_REQ_RECOVERY ON QRTZ_JOB_DETAILS(SCHED_NAME,REQUESTS_RECOVERY);
CREATE INDEX IDX_QRTZ_J_GRP ON QRTZ_JOB_DETAILS(SCHED_NAME,JOB_GROUP);

CREATE INDEX IDX_QRTZ_T_J ON QRTZ_TRIGGERS(SCHED_NAME,JOB_NAME,JOB_GROUP);
CREATE INDEX IDX_QRTZ_T_JG ON QRTZ_TRIGGERS(SCHED_NAME,JOB_GROUP);
CREATE INDEX IDX_QRTZ_T_C ON QRTZ_TRIGGERS(SCHED_NAME,CALENDAR_NAME);
CREATE INDEX IDX_QRTZ_T_G ON QRTZ_TRIGGERS(SCHED_NAME,TRIGGER_GROUP);
CREATE INDEX IDX_QRTZ_T_STATE ON QRTZ_TRIGGERS(SCHED_NAME,TRIGGER_STATE);
CREATE INDEX IDX_QRTZ_T_N_STATE ON QRTZ_TRIGGERS(SCHED_NAME,TRIGGER_NAME,TRIGGER_GROUP,TRIGGER_STATE);
CREATE INDEX IDX_QRTZ_T_N_G_STATE ON QRTZ_TRIGGERS(SCHED_NAME,TRIGGER_GROUP,TRIGGER_STATE);
CREATE INDEX IDX_QRTZ_T_NEXT_FIRE_TIME ON QRTZ_TRIGGERS(SCHED_NAME,NEXT_FIRE_TIME);
CREATE INDEX IDX_QRTZ_T_NFT_ST ON QRTZ_TRIGGERS(SCHED_NAME,TRIGGER_STATE,NEXT_FIRE_TIME);
CREATE INDEX IDX_QRTZ_T_NFT_MISFIRE ON QRTZ_TRIGGERS(SCHED_NAME,MISFIRE_INSTR,NEXT_FIRE_TIME);
CREATE INDEX IDX_QRTZ_T_NFT_ST_MISFIRE ON QRTZ_TRIGGERS(SCHED_NAME,MISFIRE_INSTR,NEXT_FIRE_TIME,TRIGGER_STATE);
CREATE INDEX IDX_QRTZ_T_NFT_ST_MISFIRE_GRP ON QRTZ_TRIGGERS(SCHED_NAME,MISFIRE_INSTR,NEXT_FIRE_TIME,TRIGGER_GROUP,TRIGGER_STATE);

CREATE INDEX IDX_QRTZ_FT_TRIG_INST_NAME ON QRTZ_FIRED_TRIGGERS(SCHED_NAME,INSTANCE_NAME);
CREATE INDEX IDX_QRTZ_FT_INST_JOB_REQ_RCVRY ON QRTZ_FIRED_TRIGGERS(SCHED_NAME,INSTANCE_NAME,REQUESTS_RECOVERY);
CREATE INDEX IDX_QRTZ_FT_J_G ON QRTZ_FIRED_TRIGGERS(SCHED_NAME,JOB_NAME,JOB_GROUP);
CREATE INDEX IDX_QRTZ_FT_JG ON QRTZ_FIRED_TRIGGERS(SCHED_NAME,JOB_GROUP);
CREATE INDEX IDX_QRTZ_FT_T_G ON QRTZ_FIRED_TRIGGERS(SCHED_NAME,TRIGGER_NAME,TRIGGER_GROUP);
CREATE INDEX IDX_QRTZ_FT_TG ON QRTZ_FIRED_TRIGGERS(SCHED_NAME,TRIGGER_GROUP);

commit;
