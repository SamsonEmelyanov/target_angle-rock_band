package com.example.targetangle.shop.commonDataService.model;

import com.example.targetangle.shop.commonDataService.dto.SearchSuggestionForThreeAttrDTO;
import com.example.targetangle.shop.commonDataService.dto.SearchSuggestionForTwoAttrDTO;
import com.example.targetangle.shop.commonDataService.entity.sql.categories.ApparelCategory;
import com.example.targetangle.shop.commonDataService.entity.sql.categories.GenderCategory;
import com.example.targetangle.shop.commonDataService.entity.sql.categories.ProductBrandCategory;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class SearchSuggestionResponse implements Serializable {
    List<GenderCategory> genderKeywords;
    List<ProductBrandCategory> brandKeywords;
    List<ApparelCategory> apparelKeywords;
    List<SearchSuggestionForTwoAttrDTO> genderApparelKeywords;
    List<SearchSuggestionForTwoAttrDTO> genderBrandKeywords;
    List<SearchSuggestionForTwoAttrDTO> apparelBrandKeywords;
    List<SearchSuggestionForThreeAttrDTO> threeAttrKeywords;
    List<String> productKeywords;
}
