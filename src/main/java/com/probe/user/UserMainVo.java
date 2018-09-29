package com.probe.user;

import org.apache.ibatis.type.Alias;

@Alias("userMain")
public class UserMainVo {
	private Long id;
    private String siDoNm;
    private String siGunGuNm;
    private String legalUepMyunDongNm;

    public UserMainVo() {
    }

    public UserMainVo(String siDoNm, String siGunGuNm, String legalUepMyunDongNm) {
        this.siDoNm = siDoNm;
        this.siGunGuNm = siGunGuNm;
        this.legalUepMyunDongNm = legalUepMyunDongNm;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSiDoNm() {
		return siDoNm;
	}

	public void setSiDoNm(String siDoNm) {
		this.siDoNm = siDoNm;
	}

	public String getSiGunGuNm() {
		return siGunGuNm;
	}

	public void setSiGunGuNm(String siGunGuNm) {
		this.siGunGuNm = siGunGuNm;
	}

	public String getLegalUepMyunDongNm() {
		return legalUepMyunDongNm;
	}

	public void setLegalUepMyunDongNm(String legalUepMyunDongNm) {
		this.legalUepMyunDongNm = legalUepMyunDongNm;
	}
}
