-- Add the decrement_quota function
create or replace function decrement_quota(
  user_id uuid,
  quota_type text,
  amount integer
) returns void 
language plpgsql
as $$
begin
  update processing_quota
  set audio_minutes = case 
    when quota_type = 'audio_minutes' then audio_minutes - amount
    else audio_minutes
  end,
  image_count = case 
    when quota_type = 'image_count' then image_count - amount
    else image_count
  end,
  pdf_pages = case 
    when quota_type = 'pdf_pages' then pdf_pages - amount
    else pdf_pages
  end
  where processing_quota.user_id = decrement_quota.user_id;
end;
$$;
