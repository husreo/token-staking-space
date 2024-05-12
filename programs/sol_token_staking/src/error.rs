use crate::*;

#[error_code]
pub enum StakingError {
    #[msg("Admin address dismatch")]
    InvalidAdmin,
    #[msg("Max count reached")]
    ExceedMaxCount,
    #[msg("Not enough reward")]
    ExceedMaxReward,
    #[msg("Metadata address is invalid")]
    InvalidMetadata,
    #[msg("Collection is invalid")]
    InvalidCollection,
    #[msg("Can not parse creators in metadata")]
    MetadataCreatorParseError,
    #[msg("Can not find NFT")]
    NftNotExist,
    #[msg("Can not unlock NFT before time")]
    StillLocked,    
    #[msg("The minimum staking period is 1 month")]
    MinimumLockDurationNotMet,
}