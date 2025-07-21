for file in btl-*
do
  mv "$file" "${file#btl-}"
done
