package org.egov.tl.producer;

import org.egov.common.utils.MultiStateInstanceUtil;
import org.egov.tl.config.TLConfiguration;
import org.egov.tracer.kafka.CustomKafkaTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class Producer {
	
	@Autowired
	private TLConfiguration configs;

    @Autowired
    private CustomKafkaTemplate<String, Object> kafkaTemplate;

	@Autowired
	private MultiStateInstanceUtil centralInstanceUtil;

	public void push(String tenantId, String topic, Object value) {
		String updatedTopic = centralInstanceUtil.getStateSpecificTopicName(tenantId, topic);
		kafkaTemplate.send(updatedTopic, value);
	}
}
