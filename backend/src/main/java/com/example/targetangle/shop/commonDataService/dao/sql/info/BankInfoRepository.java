package com.example.targetangle.shop.commonDataService.dao.sql.info;

import com.example.targetangle.shop.commonDataService.entity.sql.info.BankInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BankInfoRepository extends JpaRepository<BankInfo, Integer> {

}
