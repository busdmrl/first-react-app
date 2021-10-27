# Ödev Hakkında

İlk etapta react bilmediğim için react tutorial'ları ile başladım ve projeyi videolarda gördüğüm gibi yapmaya çalıştım. Düz react elementleri ile bir süre ilerledim fakat sayfanın görünümü sunuma uygun olmadığı için bilen birilerinden destek aldım. React kütüphanesi kullanmamı önerdiler ve Material UI kullanarak uygulamayı yapmaya başladım. Her şeyi sıfırdan destek almadan yapamasam da, ne öğrenmem gerektiğini ve nasıl öğreneceğimi öğrendim diye düşünüyorum.

## Uygulama Hakkında

### Kullanılanlar 
- VS Code
- React.js
- Material UI library

### Formun Kullanımı
- Alıcı adı, soyadı, VKN'si ve fatura tarihi sol üstten girilir.
- Orta kısımdaki gridde ürünler bulunmaktadır.
- "Ürün Ekle" butonu ile gride boş ürün satırı eklenir, grid üzerinden ilgili hücreleri güncellenebilir.
- Her ürün satırı için "birim fiyat", "adet" ve "vergi oranı" hücreleri doldurulduğunda "vergi tutarı" ve "toplam tutar" hücreleri otomatik hesaplanmaktadır.
- "Toplamları Hesapla" butonu ile formun sol altındaki orana göre vergi toplamları ve fatura toplamı hesaplanır.

### Eksikler
- Ürün silme özelliği eklenememiştir.
- "Vergi Oranı" değeri girildiğinde doğru çalışmaktadır fakat select componentinin değeri görünmemektedir.
- "birim fiyat", "adet" ve "vergi oranı" hücreleri doldurulduğunda sol alttaki toplamlar dinamik hesaplanamadığı için "Toplamları Hesapla" butonu eklenmiştir.
- TextField'lara maksimum ve minimum karakter sınırı eklenememiştir, number field'lara "e" harfi de yazılabilmektedir.
- Faturanın verisi genel hatları ile oluşturulabilir fakat axios post ile göndermek için "Kaydet" butonu eklenememiştir(zaman yetmedi)
- Çok satır ekledikçe formun çalışması yavaşlıyor.

# Teşekkürler :)