package com.example.targetangle.shop.commonDataService.entity.sql.images;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.example.targetangle.shop.commonDataService.entity.sql.categories.ApparelCategory;
import com.example.targetangle.shop.commonDataService.entity.sql.categories.GenderCategory;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class ApparelImages {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    private String title;

    private String imageLocalPath;

    private String imageURL;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "apparel_id", referencedColumnName = "id")
    @JsonIgnore
    private ApparelCategory apparelCategory;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "gender_id")
    @JsonIgnore
    private GenderCategory genderCategory;

    public ApparelImages(String title, String imageLocalPath, String imageURL) {
        this.title = title;
        this.imageLocalPath = imageLocalPath;
        this.imageURL = imageURL;
    }
}
