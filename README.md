<h2># TLCN-ShopPhuKienMayTinh</h2>
<h3>project backend cho shop ban phu kien may tinh</h3>
<h4>HDSD Git: (vì hay quên)</h4>
<table>
  <thead>
    <th align="center">STT</th>
    <th align="center">Action</th>
    <th align="center">How to</th>
  </thead>
  <tbody>
    <tr>
      <td align="center">1</td>
      <td align="center">…or create a new repository on the command line</td>
      <td>
        <p>echo "# TLCN-ShopPhuKienMayTinh" >> README.md</p>
        <p>git init</p>
        <p>git add README.md</p>
        <p>git commit -m "first commit"</p>
        <p>git branch -M main</p>
        <p>git remote add origin https://github.com/phuochung6d/TLCN-ShopPhuKienMayTinh.git</p>
        <p>git push -u origin main</p>
      </td>
    </tr>
    <tr>
      <td align="center">1</td>
      <td align="center">…or push an existing repository from the command line</td>
      <td>
        <p>git remote add origin https://github.com/phuochung6d/TLCN-ShopPhuKienMayTinh.git</p>
        <p>git branch -M main</p>
        <p>git push -u origin main</p>
        <p>…or import code from another repository</p>
        <p>You can initialize this repository with code from a Subversion, Mercurial, or TFS project.</p>
      </td>
    </tr>
  </tbody>
</table>
<h4><b>API (/api/v1):</b></h4>
<table>
  <tr>
    <td align="center"></td>
    <td align="center"></td>
    <td align="center">Mô tả</td>
    <td align="center">Hành động</td>
  </tr>
  <tr>
    <td rowspan="11">/users</td>
    <td>/signup</td>
    <td>Đăng ký tài khoản</td>
    <td>Nhấn Đăng ký</td>
  </tr>
  <tr>
    <td>/login</td>
    <td>Đăng nhập</td>
    <td>Nhấn Đăng nhập</td>
  </tr>
  <tr>
    <td>/forgotPassword</td>
    <td>Quên mật khẩu</td>
    <td>Nhấn Quên MK</td>
  </tr>
  <tr>
    <td>/resetPassword/{TOKEN}</td>
    <td>Reset mật khẩu (khi đã Quên MK)</td>
    <td></td>
  </tr>
  <tr>
    <td>/updateMyPassword</td>
    <td>Cập nhật mật khẩu (khi đã login)</td>
    <td>Nhấn Sửa MK</td>
  </tr>
  <tr>
    <td>/updateMe</td>
    <td>Cập nhật thông tin của tôi</td>
    <td>Nhấn Edit</td>
  </tr>
  <tr>
    <td>/deleteMe</td>
    <td>Xoá tài khoản của tôi</td>
    <td>Nhấn Xoá tài khoản</td>
  </tr>
  <tr>
    <td>/</td>
    <td>Xem tất cả users trong hệ thống</td>
    <td></td>
  </tr>
  <tr>
    <td>/{USER_ID}</td>
    <td>GET: thông tin 1 user trong hệ thống</td>
    <td></td>
  </tr>
  <tr>
    <td>/{USER_ID}</td>
    <td>UPDATE: thông tin 1 user trong hệ thống</td>
    <td></td>
  </tr>
  <tr>
    <td>/{USER_ID}</td>
    <td>DELETE: 1 user trong hệ thống</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="5">/products</td>
    <td>/</td>
    <td>GET: tất cả sản phẩm</td>
    <td>Ở trang chủ (chẳng hạn)</td>
  </tr>
  <tr>
    <td>/{PRODUCT_ID}</td>
    <td>GET: thông tin 1 sản phẩm</td>
    <td>Nhấn vào sản phẩm nào đó</td>
  </tr>
  <tr>
    <td>/</td>
    <td>POST: thông tin 1 sản phẩm</td>
    <td></td>
  </tr>
  <tr>
    <td>/{PRODUCT_ID}</td>
    <td>UPDATE: thông tin 1 sản phẩm</td>
    <td></td>
  </tr>
  <tr>
    <td>/{PRODUCT_ID}</td>
    <td>DELETE: 1 sản phẩm</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="5">/reviews</td>
    <td>/</td>
    <td>GET: tất cả nhận xét</td>
    <td>Nhấn vào sản phẩm nào đó</td>
  </tr>
  <tr>
    <td>/{REVIEW_ID}</td>
    <td>GET: thông tin 1 nhận xét</td>
    <td></td>
  </tr>
  <tr>
    <td>/</td>
    <td>POST: 1 nhận xét</td>
    <td></td>
  </tr>
  <tr>
    <td>/{REVIEW_ID}</td>
    <td>UPDATE: thông tin 1 nhận xét</td>
    <td></td>
  </tr>
  <tr>
    <td>/{REVIEW_ID}</td>
    <td>DELETE: 1 nhận xét</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="2">/products/<br>{PRODUCT_ID}/reviews</td>
    <td></td>
    <td>GET: tất cả nhận xét của sản phẩm nào đó</td>
    <td>Nhấn vào sản phẩm nào đó<br>sẽ hiện ra nhận xét</td>
  </tr>
  <tr>
    <td></td>
    <td>POST: nhận xét cho sản phẩm nào đó</td>
    <td>Khách hàng muốn nhận xét</td>
  </tr>
  <tr>
    <td rowspan="4">/cart</td>
    <td>/</td>
    <td>POST: thêm SP vào giỏ hàng</td>
    <td>Khách hàng nhấn thêm<br>sản phẩm vào giỏ hoặc<br>nhấn tăng số lượng SP nào đó</td>
  </tr>
  <tr>
    <td>/</td>
    <td>GET: SP trong giỏ hàng</td>
    <td>Khách hàng nhấn nút<br>giỏ hàng</td>
  </tr>
  <tr>
    <td>/decreaseFromCart</td>
    <td>POST: trừ số lượng SP<br>nào đó trong giỏ hàng</td>
    <td>KH giảm số lượng SP nào đó<br>trong giỏ hàng, khi số lượng đang<br>bằng 1 thì bấm giảm sẽ xoá SP</td>
  </tr>
  <tr>
    <td>/deleteFromCart</td>
    <td>POST: SP nào đó <br>trong giỏ hàng</td>
    <td>KH xoá SP nào đó trong<br>giỏ hàng</td>
  </tr>
</table>
<h4>Updates:</h4>
<h5>1-api-product</h5>
<p>- Chỉ là test routes cơ bản</p>
<h5>2-api-authen-author</h5>
<p>- Thêm chức năng authentication</p>
<p>- Thêm chức năng authorization</p>
<p>- Fix lỗi commit trước</p>
<h5>3-api-product-review</h5>
<p>- Thêm các chức năng advanced của Product</p>
<p>- Thêm model và chức năng của Review</p>
<p>- Do cleaning code (cho /controllers/...)</p>
<h5>4-api-cart</h5>
<p>- Thêm chức năng thêm, bớt, giảm, xoá trong giỏ hàng</p>
<p>- Lưu ý: thông tin của giỏ hàng nằm trong user hiện tại (getOneUser (role: admin) sẽ thấy)</p>
