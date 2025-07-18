package org.egov.pt.calculator.web.models;

import java.math.BigDecimal;

import org.egov.pt.calculator.web.models.demand.Category;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PropertyFYDetails {
	
	private String year;
	private String usageType;
	private String usageFactor;
	private String floorNo;
	private String constructionType;
	private BigDecimal area;
	private Double factor;
	private BigDecimal alv;
	@JsonIgnore
	private BigDecimal tpv;
	@JsonIgnore
	private BigDecimal ptax;
	@JsonIgnore
	private BigDecimal urbanCess;
	@JsonIgnore
	private String rateZone;
	@JsonIgnore
	private BigDecimal rateSlab;

}
