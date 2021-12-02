package com.example.targetangle.shop.commonDataService.dao.sql.categories;

import com.example.targetangle.shop.commonDataService.entity.sql.categories.ProductBrandCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ProductBrandCategoryRepository extends JpaRepository<ProductBrandCategory, Integer> {

    @Query(value = "SELECT p FROM ProductBrandCategory p")
    List<ProductBrandCategory> getAllData();

    ProductBrandCategory findByType(String brandName);
}
