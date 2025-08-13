package org.egov.pt.web.contracts;

import org.egov.pt.models.enums.Category;

import lombok.*;


@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class SMSRequest {
    private String mobileNumber;
    private String message;
    
    //adding new Fields Status
    private String  templateId;

	public SMSRequest(String mobileNumber, String message) {
		super();
		this.mobileNumber = mobileNumber;
		this.message = message;
	}
    
}
