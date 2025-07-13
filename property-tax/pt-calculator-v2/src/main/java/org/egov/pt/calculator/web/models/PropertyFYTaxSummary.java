package org.egov.pt.calculator.web.models;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PropertyFYTaxSummary {
	
	private String year;
	private String rateZone;
	private BigDecimal alv;
	private BigDecimal tpv;
	private BigDecimal propertyTax;
	private BigDecimal Samekit;
	private BigDecimal UrbanTax;
	private BigDecimal EducationCess;
	private BigDecimal jalKar;
	private BigDecimal jalNikas;
	private BigDecimal sevaKar;
	private BigDecimal totalTax;
	private BigDecimal rebate;
	private BigDecimal penalty;
	private BigDecimal netTax;
	

}
