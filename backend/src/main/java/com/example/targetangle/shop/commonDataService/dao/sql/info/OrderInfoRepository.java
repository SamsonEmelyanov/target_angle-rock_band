package com.example.targetangle.shop.commonDataService.dao.sql.info;

import com.example.targetangle.shop.commonDataService.entity.sql.info.OrderInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderInfoRepository extends JpaRepository<OrderInfo, Integer> {
}
