package com.example.targetangle.shop.commonDataService.service.interfaces;

import com.example.targetangle.shop.commonDataService.dto.ProductInfoDTO;
import com.example.targetangle.shop.commonDataService.entity.sql.info.ProductInfo;
import com.example.targetangle.shop.commonDataService.model.FilterAttributesResponse;
import com.example.targetangle.shop.commonDataService.model.HomeTabsDataResponse;
import com.example.targetangle.shop.commonDataService.model.MainScreenResponse;
import com.example.targetangle.shop.commonDataService.model.SearchSuggestionResponse;

import java.util.HashMap;
import java.util.List;

public interface CommonDataService {

    MainScreenResponse getHomeScreenData(String apiName);

    FilterAttributesResponse getFilterAttributesByProducts(String queryParams);

    ProductInfoDTO getProductsByCategories(String queryParams);

    HashMap<Integer, ProductInfo> getProductsById(String queryParams);

    HomeTabsDataResponse getBrandsAndApparelsByGender(String apiName);

    SearchSuggestionResponse getSearchSuggestionList();

    List <ProductInfo> getAllProduct();
}

