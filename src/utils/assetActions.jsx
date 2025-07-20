import toast from 'react-hot-toast';
import { approveAsset, rejectAsset } from '../services/apiServices';

export const handleApproveAsset = async ({
  assetId,
  status,
  navigate,
  clearCacheFor,
  fetchAssets,
}) => {
  try {
    const res = await approveAsset(assetId);
    toast.success(res || 'Asset approved');

    if (clearCacheFor) {
      clearCacheFor('APPROVED');
    }

    if (fetchAssets) {
      fetchAssets('PENDING');
    }

    if (navigate) {
      navigate('/manage-assets', { state: { status } });
    }
  } catch (err) {
    toast.error(err.message || 'Failed to approve asset');
  }
};

export const handleRejectAsset = async ({
  assetId,
  status,
  navigate,
  clearCacheFor,
  fetchAssets,
}) => {
  const confirmed = window.confirm('Are you sure you want to reject this asset?');
  if (!confirmed) return;

  try {
    const res  = await rejectAsset(assetId);
    toast.success(res || 'Asset rejected');

    if (clearCacheFor) {
      clearCacheFor('REJECTED');
    }

    if (fetchAssets) {
      fetchAssets('PENDING');
    }

    if (navigate) {
      navigate('/manage-assets', { state: { status } });
    }
  } catch (err) {
    toast.error(err.message || 'Failed to reject asset');
  }
};
