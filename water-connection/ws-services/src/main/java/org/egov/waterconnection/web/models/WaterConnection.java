package org.egov.waterconnection.web.models;

import java.util.Objects;

import jakarta.validation.constraints.Size;

import lombok.*;

import org.egov.waterconnection.web.models.workflow.ProcessInstance;
import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModelProperty;

/**
 * WaterConnection
 */
@Validated
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@jakarta.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2020-03-11T12:10:14.583+05:30[Asia/Kolkata]")
public class WaterConnection extends Connection {



	
	@JsonProperty("waterSource")
	private String waterSource = null;

	
	@JsonProperty("meterId")
	private String meterId = null;

	@JsonProperty("meterInstallationDate")
	private Long meterInstallationDate = null;

	@JsonProperty("proposedPipeSize")
	private Double proposedPipeSize = null;

	@JsonProperty("proposedTaps")
	private Integer proposedTaps = null;

	@JsonProperty("pipeSize")
	private Double pipeSize = null;

	@JsonProperty("noOfTaps")
	private Integer noOfTaps = null;

	@JsonProperty("isDisconnectionTemporary")
	private Boolean isDisconnectionTemporary = false;

	@JsonProperty("disconnectionReason")
	private String disconnectionReason = null;

	@JsonProperty("processInstance")
	private ProcessInstance processInstance;

}
