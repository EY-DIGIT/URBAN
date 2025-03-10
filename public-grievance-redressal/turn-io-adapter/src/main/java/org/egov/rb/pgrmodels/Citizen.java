package org.egov.rb.pgrmodels;

import java.util.List;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;



import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Citizen {

	private Long id;
	private String uuid;
	
	private String name;
	
	@JsonProperty("permanentAddress")
	private String address;
	
	@NotNull
	private String mobileNumber;
	
	private String aadhaarNumber;
	private String pan;
	
	private String emailId;
	private String userName;
	private String password;
	private Boolean active;
	private UserType type;
	private Gender gender;
	private String tenantId; 
	
	@JsonProperty("roles")
    private List<Role> roles;
}
